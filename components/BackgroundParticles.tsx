import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BackgroundParticles: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);

    // Create random nodes
    const nodeCount = 35;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    // Draw lines
    const linkGroup = svg.append('g').attr('stroke', '#1d1d1f').attr('stroke-width', 0.5);
    
    // Draw nodes
    const nodeGroup = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('fill', '#1d1d1f') // Dark particles for light theme
      .attr('opacity', 0.1);

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .velocityDecay(0)
      .alphaDecay(0)
      .force('boundary', () => {
        for (const node of nodes) {
           if (node.x < 0 || node.x > width) node.vx *= -1;
           if (node.y < 0 || node.y > height) node.vy *= -1;
           node.x += node.vx;
           node.y += node.vy;
        }
      });

    const timer = d3.timer(() => {
        nodes.forEach(node => {
            if (node.x < 0) node.x = width;
            if (node.x > width) node.x = 0;
            if (node.y < 0) node.y = height;
            if (node.y > height) node.y = 0;
        });

        nodeGroup
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        const links: any[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 180) {
                    links.push({ source: nodes[i], target: nodes[j], opacity: (1 - distance / 180) * 0.15 });
                }
            }
        }

        const lines = linkGroup
            .selectAll('line')
            .data(links);
        
        lines.enter()
            .append('line')
            .merge(lines as any)
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('stroke-opacity', d => d.opacity);
        
        lines.exit().remove();
    });

    const handleResize = () => {
       const w = window.innerWidth;
       const h = window.innerHeight;
       svg.attr('width', w).attr('height', h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      timer.stop();
      simulation.stop();
      window.removeEventListener('resize', handleResize);
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundParticles;
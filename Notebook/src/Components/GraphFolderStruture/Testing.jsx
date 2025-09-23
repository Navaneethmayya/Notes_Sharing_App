import { useState, useEffect, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import * as d3 from "d3";
import "reactflow/dist/style.css";
import "./Flow.css";

const initialNodes = [
  { id: "a", data: { label: "A" }, position: { x: 0, y: 0 } },
  { id: "b", data: { label: "B" }, position: { x: 0, y: 0 } },
  { id: "c", data: { label: "C" }, position: { x: 0, y: 0 } },
  { id: "d", data: { label: "D" }, position: { x: 0, y: 0 } },
  { id: "e", data: { label: "E" }, position: { x: 0, y: 0 } },
  { id: "f", data: { label: "F" }, position: { x: 0, y: 0 } },
];

const initialEdges = [
  { id: "e1", source: "a", target: "b" },
  { id: "e2", source: "b", target: "c" },
  { id: "e3", source: "c", target: "d" },
];

export default function ForceFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nForce, setNForce] = useState(-200);

  const simNodesRef = useRef([]); // d3 simulation nodes
  const simulationRef = useRef(null); // store simulation instance

  useEffect(() => {
    // copy of React Flow nodes → d3 works on its own copy
    simNodesRef.current = nodes.map((n) => ({
      ...n,
      x: n.position.x,
      y: n.position.y,
    }));
    const simLinks = edges.map((e) => ({ source: e.source, target: e.target }));

    const simulation = d3
      .forceSimulation(simNodesRef.current)
      .force(
        "link",
        d3
          .forceLink(simLinks)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(nForce))
      .force("center", d3.forceCenter(400, 250))
      .force("Charge",d3.forceCollide(10))
      .on("tick", () => {
        setNodes((nds) =>
          nds.map((n) => {
            const simNode = simNodesRef.current.find((sn) => sn.id === n.id);
            return {
              ...n,
              position: { x: simNode.x, y: simNode.y },
            };
          })
        );
      });

    simulationRef.current = simulation;

    return () => simulation.stop();
  }, [edges, nForce, setNodes]);

  // change force every 300ms
  useEffect(() => {
    const interval = setInterval(() => {
      setNForce(() => (Math.random() > 0.5 ? -20 : 20));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // 👇 Handle dragging nodes
  const handleNodeDragStart = (event, node) => {
    const simNode = simNodesRef.current.find((sn) => sn.id === node.id);
    if (simNode) {
      simNode.fx = simNode.x;
      simNode.fy = simNode.y;
    }
    simulationRef.current?.alphaTarget(0.3).restart();
  };

  const handleNodeDrag = (event, node) => {
    const simNode = simNodesRef.current.find((sn) => sn.id === node.id);
    if (simNode) {
      simNode.fx = node.position.x;
      simNode.fy = node.position.y;
    }
  };

  const handleNodeDragStop = (event, node) => {
    const simNode = simNodesRef.current.find((sn) => sn.id === node.id);
    if (simNode) {
      simNode.fx = null;
      simNode.fy = null;
    }
    simulationRef.current?.alphaTarget(0); // cool down
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

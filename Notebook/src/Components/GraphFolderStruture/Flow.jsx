import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import Button from "../Button/Buttons";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addAgent = () => {
    const newId = Math.floor(Math.random() * 10).toString();

    const newPosition = {
      x: Math.floor(Math.random() * 200) + 100,
      y: Math.floor(Math.random() * 200) + 100,
    };

    const newData = { label: `Agent ${newId.slice(0, 2)}` };
    const newNode = {
      id: newId,
      position: newPosition,
      data: newData,
    };
    setNodes((prev = []) => {
      const updated = [...prev, newNode];
      console.log("new node:", newNode);
      console.log("all nodes:", updated);
      return updated;
    });
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      
      <Button varient="primary" onClick={addAgent} label="Add Node" />
    </>
  );
}

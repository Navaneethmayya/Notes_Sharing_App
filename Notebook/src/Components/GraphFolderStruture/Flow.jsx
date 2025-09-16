import { useCallback, useState } from "react";
import "./Flow.css"
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


export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [nodeId,setNodeId] =useState("");
  const [nodeLabel,setNodeLabel] =useState("");
  const [cFrom,setCFrom] =useState("");
  const [cTo,setCTo] =useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addAgent = () => {
    const newId = nodeId;

    const newPosition = {
      x: Math.floor(Math.random() * 200) + 100,
      y: Math.floor(Math.random() * 200) + 100,
    };

   const newData = { label: nodeLabel || `Agent ${newId}` };

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
    const newEdge = { id: `e${cFrom}-${cTo}`, source: cFrom, target: cTo };
    setEdges((prev = []) => {
      const updated = [...prev, newEdge];
      console.log("new edge:", newEdge);
      console.log("all edges:", updated);
      return updated;
    });

  };

  return (
    <div className="flow_div">
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
      <div className="flow_inputs">

      <label htmlFor="node_id">Enter Node Id</label>
      <input type="text" name=""  value={nodeId} onChange={((e)=>setNodeId(e.target.value))} id="node_id" placeholder="enter node id" />
      <label htmlFor="node_lable">Enter Node lable</label>
      <input type="text" name=""  value={nodeLabel} onChange={((e)=>setNodeLabel(e.target.value))} id="node_lable" placeholder="enter node id" />
      <label htmlFor="connection_from">Connection from</label>
      <input type="text" name=""  value={cFrom} onChange={((e)=>setCFrom(e.target.value))} id="connection_from" placeholder="enter parent id"/>
      <label htmlFor="connection_to">Connection to</label>
      <input type="text" name=""  value={cTo} onChange={((e)=>setCTo(e.target.value))} id="connection_to" placeholder="enter child id"/>
      <Button varient="primary" onClick={addAgent} label="Add Node" />
      
      </div>
    </div>
  );
}

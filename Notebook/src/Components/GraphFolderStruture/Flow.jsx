import { useCallback,useEffect, useState } from "react";
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
import { toast } from "react-toastify";


export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [deleteBtn,setDeleteBtn] = useState(false);
  
  const [nodeId,setNodeId] =useState("");
  const [nodeLabel,setNodeLabel] =useState("");
  const [cFrom,setCFrom] =useState("");
  const [cTo,setCTo] =useState("");

    useEffect(() => {
    const interval = setInterval(() => {
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          position: {
            x: n.position.x + (Math.random() - 0.5) * 10, 
            y: n.position.y + (Math.random() - 0.5) * 10, 

            //   x: n.position.x +  5, 
            // y: n.position.y +  5,
          },
        }))
      );
    }, 300); // update every 300ms

    return () => clearInterval(interval);
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick=()=>{
    setDeleteBtn(true);
  }
  const addAgent = () => {

    if(nodeId !== "")
    {
      const newId = nodeId.toLowerCase();

    const newPosition = {
      x: Math.floor(Math.random() * 200) + 100,
      y: Math.floor(Math.random() * 200) + 100,
    };

   const newData = { label: nodeLabel };

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
    const newEdge = { id: `e${cFrom}-${cTo}`, source: cFrom.toLowerCase(), target: cTo.toLowerCase() };
    setEdges((prev = []) => {
      const updated = [...prev, newEdge];
      console.log("new edge:", newEdge);
      console.log("all edges:", updated);
      return updated;
    });
    }
    else{
      toast.warning("enter a topic a name to add node")
    }
    setNodeLabel("");
    setCFrom("");
  };

  return (
    <div className="flow_div">
      <ReactFlow
        deleteKeyCode="Delete"   
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div className="flow_inputs">

      <label htmlFor="node_lable">Name</label>
      <input type="text" name=""  value={nodeLabel} onChange={((e)=>{setNodeLabel(e.target.value);setNodeId(e.target.value);setCTo(e.target.value)})} id="node_lable" placeholder="Enter a topic name" />
      <label htmlFor="connection_from">Related to</label>
      <input type="text" name=""  value={cFrom} onChange={((e)=>setCFrom(e.target.value))} id="connection_from" placeholder="enter parent topic name"/>
      <Button varient="secondary" onClick={addAgent} label="Add Notes" />
      
      </div>
    </div>
  );
}

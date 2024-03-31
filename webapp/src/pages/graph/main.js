import { useCallback, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useOnSelectionChange,
} from 'reactflow';
import { Grid } from '@mui/material';
import 'reactflow/dist/style.css';
import RenderInfo from './renderinfo';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1'} },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function InfoBar({ selection, setSelection }) {
    // hook: on node/edge select
    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setSelection(nodes.concat(edges));
        },
    });

    return (
        <div className='infobar'>
            {
                selection.length === 1
                    ? (
                        <RenderInfo id={selection[0].id} />
                    )
                    : (
                        <div>
                            <p>Selected ({selection.length}):</p>
                            <p>{selection.map(o => o.id).join(', ')}</p>
                        </div>
                    )
            }
        </div>
    );
}

function PageGraph() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selection, setSelection] = useState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <ReactFlowProvider>
            <Grid container spacing={2} className='fullheight'>
                <Grid item xs={12} sm={9} md={10}>
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
                </Grid>
                <Grid item xs={0} sm={3} md={2}>
                    <InfoBar selection={selection} setSelection={setSelection} />
                </Grid>
            </Grid>
        </ReactFlowProvider>
    );
}

export default PageGraph;
import { useState } from 'react';
import './board.css';

function NodeContents({ nodes, choose }) {
    return (
        <div id="anchor-node">
            {Object.keys(nodes).map(id => {
                let node = nodes[id];
                return (
                    <div key={node.id} className="node" onClick={choose(node.id)} style={{ left: node.x, top: node.y }}>
                        {node.name}
                    </div>
                );
            })}
        </div>
    )
}

function EdgeContents({ nodes, edges, choose }) {
    return (
        <div id="anchor-edge">
            {Object.keys(edges).map(id => {
                var edge = edges[id];
                var src = nodes[edge.src];
                var dst = nodes[edge.dst];

                var d;
                switch (edge.curve) {
                    case 'bezier':
                        d = `M ${src.x} ${src.y} C ${src.x} ${(src.y + dst.y) / 2}, ${dst.x} ${(src.y + dst.y) / 2}, ${dst.x} ${dst.y}`;
                        break;
                    default:
                        d = `M ${src.x} ${src.y} L ${dst.x} ${dst.y}`;
                }

                return (
                    <svg key={edge.id} className="edge" style={{ left: src.x, top: src.y }}>
                        <path className="edge-display" d={d} />
                        <path className="edge-interaction" onClick={choose(edge.id)} d={d} />
                    </svg>
                )
            })}
        </div>
    )
}

function BoardContent({ canvasSize, setCanvasSize }) {
    var [nodes, setNodes] = useState({
        "N-0": { id: "N-0", x: 100, y: 0, name: 'a' },
        "N-1": { id: "N-1", x: 0, y: 100, name: 'b' },
    });
    var [edges, setEdges] = useState({
        "E-0": { id: "E-0", src: "N-0", dst: "N-1", name: 'a->b', curve: 'bezier' },
    });

    // setTimeout(() => {
    //     setNodes({"N-0": { id: "N-0", x: 100, y: 0, name: 'a' }, "N-1": { id: "N-1", x: 0, y: 100, name: 'b' }, "N-2": { id: "N-2", x: 200, y: 200, name: 'c' }});
    // }, 1000);

    // set canvas size
    var nx1 = canvasSize[0], ny1 = canvasSize[1], nx2 = canvasSize[2], ny2 = canvasSize[3];
    for (var n in nodes) {
        nx1 = Math.min(nx1, nodes[n].x);
        ny1 = Math.min(ny1, nodes[n].y);
        nx2 = Math.max(nx2, nodes[n].x);
        ny2 = Math.max(ny2, nodes[n].y);
    }
    if (nx1 !== canvasSize[0] || ny1 !== canvasSize[1] || nx2 !== canvasSize[2] || ny2 !== canvasSize[3])   // MUST! otherwise infinite loop
        setCanvasSize([nx1, ny1, nx2, ny2]);

    function choose(id) {
        // wrapper
        return function () {
            console.log('choose', id);
        }
    }

    return (
        <>
            <NodeContents choose={choose} nodes={nodes} />
            <EdgeContents choose={choose} nodes={nodes} edges={edges} />
        </>
    )
}

function Anchor({ viewPoint, viewScale, canvasSize, setCanvasSize }) {
    return (
        <div id="anchor" style={{
            // position & scale
            left: -viewPoint[0],
            top: -viewPoint[1],
            transform: `scale(${viewScale})`,
        }}>
            <BoardContent canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
        </div>
    )
}

export default Anchor;
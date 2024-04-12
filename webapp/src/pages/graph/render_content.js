import './board.css';

function NodeContents({ nodes }) {
    return (
        <div id="anchor-node">
            {Object.keys(nodes).map(id => {
                let node = nodes[id];
                return (
                    <div key={node.id} className="node" style={{ left: node.x, top: node.y }}>
                        {node.name}
                    </div>
                );
            })}
        </div>
    )
}

function EdgeContents({ nodes, edges }) {
    return (
        <div id="anchor-edge">
            {Object.keys(edges).map(id => {
                var edge = edges[id];
                var src = nodes[edge.src];
                var dst = nodes[edge.dst];

                switch (edge.curve) {
                    case 'bezier':
                        return (
                            <svg key={edge.id} className="edge" style={{ left: src.x, top: src.y }}>
                                <path d={`M ${src.x} ${src.y} C ${src.x} ${(src.y + dst.y) / 2}, ${dst.x} ${(src.y + dst.y) / 2}, ${dst.x} ${dst.y}`}/>
                            </svg>
                        )
                    default:
                        return null;
                }
            })}
        </div>
    )
}

function BoardContent() {
    var nodes = {
        "N-0": { id: "N-0", x: 100, y: 0, name: 'a' },
        "N-1": { id: "N-1", x: 0, y: 100, name: 'b' },
    };
    var edges = {
        "E-0": { id: "E-0", src: "N-0", dst: "N-1", name: 'a->b', curve: 'bezier' },
    };

    return (
        <>
            <NodeContents nodes={nodes} />
            <EdgeContents nodes={nodes} edges={edges} />
        </>
    )
}

function Anchor({ viewPoint, viewScale }) {
    return (
        <div id="anchor" style={{
            // position & scale
            left: -viewPoint[0],
            top: -viewPoint[1],
            transform: `scale(${viewScale})`,
        }}>
            <BoardContent />
        </div>
    )
}

export default Anchor;
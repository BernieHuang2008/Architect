import './board.css';

function NodeContents({ nodes }) {
    return (
        <div id="anchor-nodes">
            {nodes.map((node, index) => (
                <div key={node.id} className="node" style={{ left: node.x, top: node.y }}>
                    {node.name}
                </div>
            ))}
        </div>
    )
}

function BoardContent() {
    var nodes = [
        { id: "N-0", x: 100, y: 0, name: 'a' },
        { id: "N-1", x: 0, y: 100, name: 'b' },
    ];
    var edges = [
        { id: "E-0", src: 0, dst: 1, name: 'a->b' },
    ];

    return (
        <>
            <NodeContents nodes={nodes} />
            <div id="anchor-edges">

            </div>
        </>
    )
}

function Anchor({viewPoint, viewScale}) {
    return (
        <div id="anchor" style={{
            width: 0,
            height: 0,
            // content position
            position: 'relative',
            left: -viewPoint[0],
            top: -viewPoint[1],
            transform: `scale(${viewScale})`,
        }}>
            <BoardContent />
        </div>
    )
}

export default Anchor;
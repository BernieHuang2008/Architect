import { useState } from "react"

function InfBoard() {
    var [viewPoint, setViewPoint] = useState([0, 0]);   // [x, y]
    var [canvasSize, setCanvasSize] = useState([1e5, 1e5]);    // [width, height]
    var [viewScale, setViewScale] = useState(1);

    function onscroll() {
        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');
        var scrollX = sbX.scrollLeft;
        var scrollY = sbY.scrollTop;

        setViewPoint([scrollX, scrollY]);
    }

    return (
        <>
            <div id="InfBoardViewBox">
                <div id="anchor" style={{
                    width: 0,
                    height: 0,
                    // content position
                    position: 'relative',
                    left: -viewPoint[0],
                    top: -viewPoint[1],
                    scale: viewScale,
                }}></div>
            </div>
            <div className="footbar">
                <div className="vscrollbar-x" onScroll={onscroll}><div style={{ width: canvasSize[0] }}></div></div>
            </div>
            <div className="rightbar">
                <div className="vscrollbar-y" onScroll={onscroll}><div style={{ height: canvasSize[1] }}></div></div>
            </div>
        </>
    )
}

function PageGraph() {
    return (
        <>
            <div className="page page-graph" id="page-graph">
                <InfBoard />
            </div>
        </>
    )
}

export default PageGraph;
import { useState, useEffect, useRef } from "react"
import Anchor from "./render_content";

function InfBoard() {
    var ref = useRef(null);
    var [viewPoint, setViewPoint] = useState([0, 0]);   // [x, y]
    var [viewScale, setViewScale] = useState(1.0);
    var [canvasSize, setCanvasSize] = useState([0, 0, 0, 0]);    // [x, y, width, height]
    var [inited, setInited] = useState(false);

    // (helper) refs
    const viewScaleRef = useRef(viewScale);
    const viewPointRef = useRef(viewPoint);
    useEffect(() => {
        viewScaleRef.current = viewScale;
        viewPointRef.current = viewPoint;
    }, [viewScale, viewPoint]);

    // when scrollbar scrolls
    function onSbScroll() {
        if (inited === false)
            return true;

        var sbX = document.querySelector('.vscrollbar.x');
        var sbY = document.querySelector('.vscrollbar.y');

        var scrollX = sbX.scrollLeft - window.innerWidth;
        var scrollY = sbY.scrollTop - window.innerHeight;

        setViewPoint([scrollX, scrollY]);
    }

    // when mouse wheel scrolls
    function onWhScroll(e) {
        var sbX = document.querySelector('.vscrollbar.x');
        var sbY = document.querySelector('.vscrollbar.y');
        var deltaX = e.deltaX;
        var deltaY = e.deltaY;

        // ctrl: scale
        if (e.ctrlKey === true) {
            return onScale(e);
        }

        // shift: horizontal scroll
        if (e.shiftKey === true) {
            deltaX = e.deltaY;
            deltaY = e.deltaX;
        }

        if (deltaX + deltaY < 80)
            document.querySelector('#anchor').classList.add('no-animation');

        sbX.scrollBy(deltaX, 0);
        sbY.scrollBy(0, deltaY);

        document.querySelector('#anchor').classList.remove('no-animation');
    }

    // when scales
    function onScale(e) {
        const alpha = 0.005;

        // update scale
        const oldScale = viewScaleRef.current;
        const newScale = oldScale * Math.pow(1.1, e.wheelDelta * alpha);

        // update view point
        var viewPoint = viewPointRef.current;
        // convert screen-coord to anchor-px-coord
        const anchorX = -viewPoint[0];
        const anchorY = -viewPoint[1];
        var cx = e.clientX - 51;
        var cy = e.clientY;
        var dx = (cx - anchorX) * (newScale - oldScale) / oldScale;
        var dy = (cy - anchorY) * (newScale - oldScale) / oldScale;

        requestAnimationFrame(() => {
            // actuall scale
            setViewScale(newScale);

            // actuall scroll
            const sbX = document.querySelector('.vscrollbar.x');
            const sbY = document.querySelector('.vscrollbar.y');
            sbX.scrollBy(dx, 0);
            sbY.scrollBy(0, dy);
        });

        // prevent default
        e.preventDefault();
        return false;
    }

    // init: only run once
    useEffect(() => {
        // init v-scrollbar
        var sbX = document.querySelector('.vscrollbar.x');
        var sbY = document.querySelector('.vscrollbar.y');
        sbX.scrollLeft = -canvasSize[0] + window.innerWidth / 2;
        sbY.scrollTop = -canvasSize[1] + window.innerHeight / 2;

        // add listeners
        var infBoard = ref.current;
        infBoard.addEventListener('wheel', onWhScroll, { passive: false });

        // inited
        setInited(true);

        return () => {
            if (infBoard === null)
                return;

            // remove listeners
            infBoard.removeEventListener('wheel', onWhScroll);
        }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div id="InfBoardViewBox" ref={ref}>
                <Anchor viewPoint={viewPoint} viewScale={viewScale} canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
            </div>
            <div className="footbar">
                <div className="vscrollbar x" onScroll={onSbScroll}><div className="scroll-block" style={{ width: canvasSize[2] * viewScale }}></div></div>
            </div>
            <div className="rightbar">
                <div className="vscrollbar y" onScroll={onSbScroll}><div className="scroll-block" style={{ height: canvasSize[3] * viewScale }}></div></div>
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
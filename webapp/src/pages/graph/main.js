import { useState, useEffect, useRef } from "react"

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

        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');

        var scrollX = sbX.scrollLeft - window.innerWidth;
        var scrollY = sbY.scrollTop - window.innerHeight;

        setViewPoint([scrollX, scrollY]);
    }

    // when mouse wheel scrolls
    function onWhScroll(e) {
        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');
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

        sbX.scrollBy(deltaX, 0);
        sbY.scrollBy(0, deltaY);
    }

    // when area scales
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

        // actuall scale
        setViewScale(newScale);

        // actuall scroll
        const sbX = document.querySelector('.vscrollbar-x');
        const sbY = document.querySelector('.vscrollbar-y');
        sbX.scrollBy(dx, 0);
        sbY.scrollBy(0, dy);

        // prevent default
        e.preventDefault();
        return false;
    }

    // when innerHTML changes
    useEffect(() => (new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // add node
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    var nx1 = node.offsetLeft;
                    var ny1 = node.getBoundingClientRect().y;
                    var nx2 = nx1 + node.getBoundingClientRect().x;
                    var ny2 = ny1 + node.getBoundingClientRect().y;
                    console.log(nx1, ny1, nx2, ny2)
                    // update canvas size
                    setCanvasSize([
                        Math.min(canvasSize[0], nx1),
                        Math.min(canvasSize[1], ny1),
                        Math.max(canvasSize[2], nx2),
                        Math.max(canvasSize[3], ny2)
                    ]);
                })
            }
            // remove node
            // for performance reasons, we will update it only when saving into the disk
        })
    })).observe(document.querySelector('#anchor'), { childList: true }), []);

    // init
    useEffect(() => {
        // init v-scrollbar
        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');
        sbX.scrollLeft = -canvasSize[0] + window.innerWidth / 2;
        sbY.scrollTop = -canvasSize[1] + window.innerHeight / 2;

        // add listeners
        ref.current.addEventListener('wheel', onWhScroll, { passive: false });

        setInited(true);

        return () => {
            if (ref.current === null)
                return;

            ref.current.removeEventListener('wheel', onWhScroll);
        }
    }, [])

    return (
        <>
            <div id="InfBoardViewBox" ref={ref}>
                <div id="anchor" style={{
                    width: 0,
                    height: 0,
                    // content position
                    position: 'relative',
                    left: -viewPoint[0],
                    top: -viewPoint[1],
                    transform: `scale(${viewScale})`,
                }}></div>
            </div>
            <div className="footbar">
                <div className="vscrollbar-x" onScroll={onSbScroll}><div className="scroll-block" style={{ width: canvasSize[2] * viewScale }}></div></div>
            </div>
            <div className="rightbar">
                <div className="vscrollbar-y" onScroll={onSbScroll}><div className="scroll-block" style={{ height: canvasSize[3] * viewScale }}></div></div>
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
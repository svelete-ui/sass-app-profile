export function dragMe(node) {
    let moving = false;

    let initX: string = node.dataset.initX;
    let initY: string = node.dataset.initY;

    let left: number = parseInt(initX) ?? 0;
    let top: number =  parseInt(initX) ?? 0;

    // node.style.position = 'absolute';
    node.style.top = `${top}px`;
    node.style.left = `${left}px`;
    node.style.cursor = 'move';
    node.style.userSelect = 'none';

    node.addEventListener('mousedown', () => {
        moving = true;
    });

    window.addEventListener('mousemove', (e) => {
        if (moving) {
 
            node.style.position = 'absolute';
            top += e.movementY;
            left += e.movementX;
            node.style.top = `${top}px`;
            node.style.left = `${left}px`;
        }
    });

    window.addEventListener('mouseup', () => {
        moving = false;
    });
}
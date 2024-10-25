class NodeRBT {
    constructor(data, isLeaf) {
        this.data = data;
        this.color = isLeaf ? "BLACK" : "RED";
    }
    getData() { return this.data; }
    setFather(newFather) { this.father = newFather; }
    getFather() { return this.father; }
    setLeftChild(newChild) { this.leftChild = newChild; }
    getLeftChild() { return this.leftChild; }
    setRightChild(newChild) { this.rightChild = newChild; }
    getRightChild() { return this.rightChild; }
    setNodeAsRed() { this.color = "RED"; }
    setNodeAsBlack() { this.color = "BLACK"; }
    getColor() { return this.color; }
}
class RBTree {
    constructor(ctx) {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.ctx = ctx;
    }
    insert(data) {
        const newNode = new NodeRBT(data);
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        let parent = this.leaf;
        let current = this.root;
        while (current !== this.leaf) {
            parent = current;
            current = data < current.getData() ? current.getLeftChild() : current.getRightChild();
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        }
        else if (data < parent.getData()) {
            parent.setLeftChild(newNode);
        }
        else {
            parent.setRightChild(newNode);
        }
        this.fixInsert(newNode);
        this.drawTree();
    }
    delete(value) {
        // Implementación de eliminación y llamada a fixDelete
        // Después de eliminar el nodo, se redibuja el árbol:
        this.drawTree();
    }
    fixInsert(node) {
        // Implementación de corrección de inserción
    }
    drawTree() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.drawNode(this.root, 400, 30, 200);
    }
    drawNode(node, x, y, offset) {
        if (node === this.leaf)
            return;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = node.getColor() === "RED" ? "#e74c3c" : "#2c3e50";
        this.ctx.fill();
        this.ctx.strokeText(node.getData().toString(), x - 5, y + 5);
        this.ctx.stroke();
        if (node.getLeftChild() !== this.leaf) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - offset, y + 70);
            this.ctx.stroke();
            this.drawNode(node.getLeftChild(), x - offset, y + 70, offset / 2);
        }
        if (node.getRightChild() !== this.leaf) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + offset, y + 70);
            this.ctx.stroke();
            this.drawNode(node.getRightChild(), x + offset, y + 70, offset / 2);
        }
    }
}
// Inicialización en la interfaz
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const rbTree = new RBTree(ctx);
window.insertNode = () => {
    const value = document.getElementById("nodeValue").valueAsNumber;
    if (!isNaN(value))
        rbTree.insert(value);
};
window.deleteNode = () => {
    const value = document.getElementById("nodeValue").valueAsNumber;
    if (!isNaN(value))
        rbTree.delete(value);
};
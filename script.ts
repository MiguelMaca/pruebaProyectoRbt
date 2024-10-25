class NodeRBT {
    private data: number;
    private color: string;
    private father!: NodeRBT;
    private leftChild!: NodeRBT;
    private rightChild!: NodeRBT;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = isLeaf ? "BLACK" : "RED";
    }

    getData(): number { return this.data; }
    setFather(newFather: NodeRBT): void { this.father = newFather; }
    getFather(): NodeRBT { return this.father; }
    setLeftChild(newChild: NodeRBT): void { this.leftChild = newChild; }
    getLeftChild(): NodeRBT { return this.leftChild; }
    setRightChild(newChild: NodeRBT): void { this.rightChild = newChild; }
    getRightChild(): NodeRBT { return this.rightChild; }
    setNodeAsRed(): void { this.color = "RED"; }
    setNodeAsBlack(): void { this.color = "BLACK"; }
    getColor(): string { return this.color; }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.ctx = ctx;
    }

    public insert(data: number): void {
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
        } else if (data < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        this.fixInsert(newNode);
        this.drawTree();
    }

    public delete(value: number): void {
        // Implementación de eliminación y llamada a fixDelete
        // Después de eliminar el nodo, se redibuja el árbol:
        this.drawTree();
    }

    private fixInsert(node: NodeRBT): void {
        // Implementación de corrección de inserción
    }

    private drawTree(): void {
        this.ctx.clearRect(0, 0, 800, 600);
        this.drawNode(this.root, 400, 30, 200);
    }

    private drawNode(node: NodeRBT, x: number, y: number, offset: number): void {
        if (node === this.leaf) return;

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
const canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const rbTree = new RBTree(ctx);

(window as any).insertNode = () => {
    const value = (document.getElementById("nodeValue") as HTMLInputElement).valueAsNumber;
    if (!isNaN(value)) rbTree.insert(value);
};

(window as any).deleteNode = () => {
    const value = (document.getElementById("nodeValue") as HTMLInputElement).valueAsNumber;
    if (!isNaN(value)) rbTree.delete(value);
};

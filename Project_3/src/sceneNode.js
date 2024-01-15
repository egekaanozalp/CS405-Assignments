/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // Apply the transformation to the current node:
        var transformedMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());
        var transformedModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());
        var transformedNormals = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());
        var transformedModel = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());

        // Draw the MeshDrawer (transformed version of the current node)
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Apply the transformation to the child nodes and draw them:
        for (var i = 0; i < this.children.length; ++i) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }

    

}
import NodeCache from 'node-cache'

class Cache {
    nodeCache: NodeCache
    constructor(nodeCache: NodeCache) {
        this.nodeCache = nodeCache
    }
}

export default new Cache(new NodeCache());

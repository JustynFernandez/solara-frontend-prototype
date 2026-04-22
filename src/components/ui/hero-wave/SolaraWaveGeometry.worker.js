/// <reference lib="webworker" />
const smoothstep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / Math.max(edge1 - edge0, 0.0001)));
    return t * t * (3 - 2 * t);
};
const addNormal = (normals, index, x, y, z) => {
    normals[index] += x;
    normals[index + 1] += y;
    normals[index + 2] += z;
};
const normalizeNormals = (normals) => {
    for (let index = 0; index < normals.length; index += 3) {
        const x = normals[index];
        const y = normals[index + 1];
        const z = normals[index + 2];
        const length = Math.hypot(x, y, z) || 1;
        normals[index] = x / length;
        normals[index + 1] = y / length;
        normals[index + 2] = z / length;
    }
};
const buildFoldedGeometry = (input) => {
    const { width, height, subdivisionsX, subdivisionsY, foldStart, foldDepth, arcDepth, skewX, dropY, rotation, } = input;
    const columns = subdivisionsX + 1;
    const rows = subdivisionsY + 1;
    const vertexCount = columns * rows;
    const positions = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    const normals = new Float32Array(vertexCount * 3);
    const indices = new Uint32Array(subdivisionsX * subdivisionsY * 6);
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const sinRotation = Math.sin(rotation);
    const cosRotation = Math.cos(rotation);
    let positionOffset = 0;
    let uvOffset = 0;
    for (let row = 0; row < rows; row += 1) {
        const v = row / subdivisionsY;
        const baseY = halfHeight - v * height;
        const verticalEase = 1 - Math.pow(v, 0.72);
        for (let column = 0; column < columns; column += 1) {
            const u = column / subdivisionsX;
            const baseX = -halfWidth + u * width;
            const fold = smoothstep(foldStart, 1, u);
            const foldArch = Math.sin(fold * Math.PI * 0.85);
            const shoulder = smoothstep(0.02, 0.88, 1 - v);
            const diagonalLift = fold * shoulder;
            const crown = fold * Math.pow(shoulder, 1.18);
            const midBand = Math.max(0, 1 - Math.abs(v - 0.46) * 1.82);
            const shoulderRidge = smoothstep(foldStart + 0.06, 0.72, u) *
                (1 - smoothstep(0.8, 0.96, u)) *
                smoothstep(0.18, 0.88, shoulder);
            const foldChannel = smoothstep(0.82, 0.98, u) * smoothstep(0.04, 0.94, shoulder);
            const shoulderFace = smoothstep(0.24, 0.78, u) * (1 - smoothstep(0.82, 0.94, u)) * smoothstep(0.2, 0.9, shoulder);
            let x = baseX + fold * width * skewX * (0.18 + verticalEase * 0.92);
            let y = baseY - foldArch * arcDepth * (0.16 + shoulder * 1.08);
            let z = fold * foldDepth * (0.34 + shoulder * 1.18);
            x += crown * width * 0.22;
            x -= midBand * fold * width * 0.038;
            x += shoulderFace * width * 0.042;
            x += shoulderRidge * width * 0.068 * (0.32 + shoulder * 0.68);
            x -= foldChannel * width * 0.052;
            y -= diagonalLift * dropY * 1.04;
            y += midBand * arcDepth * 0.06;
            y += shoulderFace * arcDepth * 0.035;
            y -= shoulderRidge * arcDepth * (0.12 + shoulder * 0.18);
            y -= foldChannel * arcDepth * 0.15;
            y -= Math.sin((u * 0.84 + v * 0.28) * Math.PI) * fold * 0.18;
            z += crown * foldDepth * 0.34;
            z += shoulderFace * foldDepth * 0.08;
            z += shoulderRidge * foldDepth * (0.22 + shoulder * 0.32);
            z += foldChannel * foldDepth * 0.4;
            z += Math.cos((u * 0.78 - v * 0.22) * Math.PI) * fold * 0.12;
            z -= smoothstep(0, 0.24, u) * (1 - shoulder) * foldDepth * 0.06;
            const rotatedX = x * cosRotation - y * sinRotation;
            const rotatedY = x * sinRotation + y * cosRotation;
            positions[positionOffset] = rotatedX;
            positions[positionOffset + 1] = rotatedY;
            positions[positionOffset + 2] = z;
            positionOffset += 3;
            uvs[uvOffset] = u;
            uvs[uvOffset + 1] = 1 - v;
            uvOffset += 2;
        }
    }
    let indexOffset = 0;
    for (let row = 0; row < subdivisionsY; row += 1) {
        for (let column = 0; column < subdivisionsX; column += 1) {
            const a = column + row * columns;
            const b = column + (row + 1) * columns;
            const c = column + 1 + (row + 1) * columns;
            const d = column + 1 + row * columns;
            indices[indexOffset] = a;
            indices[indexOffset + 1] = b;
            indices[indexOffset + 2] = d;
            indices[indexOffset + 3] = b;
            indices[indexOffset + 4] = c;
            indices[indexOffset + 5] = d;
            indexOffset += 6;
        }
    }
    for (let index = 0; index < indices.length; index += 3) {
        const ia = indices[index] * 3;
        const ib = indices[index + 1] * 3;
        const ic = indices[index + 2] * 3;
        const ax = positions[ia];
        const ay = positions[ia + 1];
        const az = positions[ia + 2];
        const bx = positions[ib];
        const by = positions[ib + 1];
        const bz = positions[ib + 2];
        const cx = positions[ic];
        const cy = positions[ic + 1];
        const cz = positions[ic + 2];
        const abx = bx - ax;
        const aby = by - ay;
        const abz = bz - az;
        const acx = cx - ax;
        const acy = cy - ay;
        const acz = cz - az;
        const normalX = aby * acz - abz * acy;
        const normalY = abz * acx - abx * acz;
        const normalZ = abx * acy - aby * acx;
        addNormal(normals, ia, normalX, normalY, normalZ);
        addNormal(normals, ib, normalX, normalY, normalZ);
        addNormal(normals, ic, normalX, normalY, normalZ);
    }
    normalizeNormals(normals);
    return { positions, uvs, normals, indices };
};
const workerScope = self;
workerScope.onmessage = (event) => {
    const geometry = buildFoldedGeometry(event.data);
    workerScope.postMessage(geometry, [
        geometry.positions.buffer,
        geometry.uvs.buffer,
        geometry.normals.buffer,
        geometry.indices.buffer,
    ]);
};
export {};

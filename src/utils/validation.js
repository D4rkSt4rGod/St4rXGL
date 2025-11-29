// 유효성 검사 함수들
export function isValidObjectId(id) {
    return typeof id === 'number' && id >= 0 && Number.isInteger(id);
}

export function isValidColor(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export function isValidPosition(x, y, z) {
    return isValidNumber(x) && isValidNumber(y) && isValidNumber(z);
}

export function isValidScale(x, y, z) {
    return isValidNumber(x) && x > 0 && 
           isValidNumber(y) && y > 0 && 
           isValidNumber(z) && z > 0;
}

export function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export function validateObjectExists(core, objectId) {
    if (!core || !isValidObjectId(objectId)) {
        return false;
    }
    return core.objects.has(objectId);
}

export function validateLightExists(core, lightId) {
    if (!core || !isValidObjectId(lightId)) {
        return false;
    }
    return core.lights.has(lightId);
}

export function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '');
}

export function validateScriptCode(code) {
    if (typeof code !== 'string') return false;
    
    // 위험한 패턴 검사
    const dangerousPatterns = [
        /eval\s*\(/,
        /Function\s*\(/,
        /setTimeout\s*\([^)]*\)/,
        /setInterval\s*\([^)]*\)/,
        /document\./,
        /window\./,
        /localStorage/,
        /sessionStorage/,
        /XMLHttpRequest/,
        /fetch\s*\(/,
        /import\s*\(/
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(code)) {
            return false;
        }
    }
    
    return true;
}
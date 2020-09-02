// Networking utils for headers and other common needs
const CID_HEADER_NAME = 'X-ClientId';
const CID_STORAGE_NAME = 'CLIENT_ID';
const REG_CID_HEADER_NAME = 'X-RegClientId';
const REG_CID_STORAGE_NAME = 'REG_CLIENT_ID';

export function generateHeaders(addIn = {}) {
  return {
    Accept: 'application/json',
    [`${CID_HEADER_NAME}`]: getCID() || '',
    ...addIn
  };
}

export function generateRegHeaders(addIn = {}) {
  return {
    Accept: 'application/json',
    [`${REG_CID_HEADER_NAME}`]: getRegCID() || '',
    ...addIn
  };
}

export function generateFetchOptions(addInHeaders = {}) {
  return {
    headers: generateHeaders(addInHeaders),
    credentials: 'include'
  };
}

export function generateRegFetchOptions(addInHeaders = {}) {
  return {
    headers: generateRegHeaders(addInHeaders),
    credentials: 'include'
  };
}

export function getCID() {
  return localStorage.getItem(CID_STORAGE_NAME);
}

export function setCID(cid) {
  if (cid !== null) {
    localStorage.setItem(CID_STORAGE_NAME, cid);
  } else {
    clearCID();
  }
}

export function clearCID() {
  localStorage.removeItem(CID_STORAGE_NAME);
}

export function getRegCID() {
  return localStorage.getItem(REG_CID_STORAGE_NAME);
}

export function setRegCID(cid) {
  if (cid !== null) {
    localStorage.setItem(REG_CID_STORAGE_NAME, cid);
  } else {
    clearCID();
  }
}

export function clearRegCID() {
  localStorage.removeItem(REG_CID_STORAGE_NAME);
}

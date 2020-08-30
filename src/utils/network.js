// Networking utils for headers and other common needs
const CID_STORAGE_NAME = 'CLIENT_ID';

export function generateHeaders(addIn = {}) {
  return {
    Accept: 'application/json',
    'X-ClientId': getCID() || '',
    ...addIn
  };
}

export function generateFetchOptions(addInHeaders = {}) {
  return {
    headers: generateHeaders(addInHeaders),
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

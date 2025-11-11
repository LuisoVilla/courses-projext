const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch for node environment
global.fetch = jest.fn();
global.Request = jest.fn();
global.Response = jest.fn();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/videos', () => {
    let newVideo = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/testing/all-data').expect(204);
    }));
    it('GET products = []', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get('/videos/').expect([]);
    }));
    it('- POST does not create the video with incorrect data (no title, no author)', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, supertest_1.default)(src_1.app)
                .post('/videos/')
                .send({ title: '', author: '' })
                .expect(400, {
                errorsMessages: [
                    { message: 'title is required', field: 'title' },
                    { message: 'author is required', field: 'author' },
                ],
            });
            const res = yield (0, supertest_1.default)(src_1.app).get('/videos/');
            expect(res.body).toEqual([]);
        });
    });
    it('- GET product by ID with incorrect id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get('/videos/helloWorld').expect(400);
    }));
    it('+ GET product by ID with correct id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/videos/' + newVideo.id)
            .expect(200, newVideo);
    }));
    it('- PUT product by ID with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        yield (0, supertest_1.default)(src_1.app)
            .put('/videos/' + 1223)
            .send({ title: 'title', author: 'title' })
            .expect(404);
        const res = yield (0, supertest_1.default)(src_1.app).get('/videos/');
        expect(res.body[0]).toEqual(newVideo);
    }));
    it('+ PUT product by ID with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/videos/' + newVideo.id)
            .send({
            title: 'hello title',
            author: 'hello author',
            publicationDate: '2023-01-12T08:12:39.261Z',
        })
            .expect(204);
        const res = yield (0, supertest_1.default)(src_1.app).get('/videos/');
        expect(res.body[0]).toEqual(Object.assign(Object.assign({}, newVideo), { title: 'hello title', author: 'hello author', publicationDate: '2023-01-12T08:12:39.261Z' }));
        newVideo = res.body[0];
    }));
    it('- DELETE product by incorrect ID', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/videos/876328')
            .expect(404);
        const res = yield (0, supertest_1.default)(src_1.app).get('/videos/');
        expect(res.body[0]).toEqual(newVideo);
    }));
    it('+ DELETE product by correct ID, auth', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/videos/' + newVideo.id)
            .set('authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204);
        const res = yield (0, supertest_1.default)(src_1.app).get('/videos/');
        expect(res.body.length).toBe(0);
    }));
});

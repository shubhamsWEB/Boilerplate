import axios from 'axios';

jest.mock('axios');

describe('Get LiveMatch Data', () => {
   
    it('Geeting Match Info', async (done: any) => {
        const mockedRes = {
            message: "balls retrieved successfully",
            data: [
                {
                    ball_number: 0.2,
                    ball_summary: "1",
                    id: 8
                },
                {
                    ball_number: 0.1,
                    ball_summary: "3",
                    id: 7
                }
            ]
        };
        const mockResponse = { data: mockedRes, status: 200 };
        (axios.get as any).mockResolvedValue(mockResponse);
        const response = await axios.get('/lasttenballs/1');
        expect(response.status).toBe(200);
        done();
    });
});

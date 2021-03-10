import axios from 'axios';
jest.mock('axios');
describe('Get LiveMatch Data', () => {
    it('Geeting Match Info', async (done: any) => {
        const mockedRes = {
            message: "live match data retrieved successfully!",
            data: {
                score: 4,
                overs: 0.1,
                wickets: 0,
                strickerId: 1,
                nonStrickerId: 2,
                bowlerId: 22,
                batting: [
                    {
                        playerId: 2,
                        player_name: "b",
                        runs: 8,
                        balls_faced: 2,
                        fours: 2,
                        sixs: 0,
                        overs_bowled: 0,
                        runs_given: 0,
                        wickets: 0,
                        extras: 0
                    },
                    {
                        playerId: 1,
                        player_name: "a",
                        runs: 4,
                        balls_faced: 1,
                        fours: 1,
                        sixs: 0,
                        overs_bowled: 0,
                        runs_given: 0,
                        wickets: 0,
                        extras: 0
                    }
                ],
                bowling: [
                    {
                        playerId: 22,
                        player_name: "11",
                        runs: 0,
                        balls_faced: 0,
                        fours: 0,
                        sixs: 0,
                        overs_bowled: 0.1,
                        runs_given: 4,
                        wickets: 0,
                        extras: 0
                    }
                ]
            }
        };
        const mockResponse = { data: mockedRes, status: 200 };
        (axios.get as any).mockResolvedValue(mockResponse);
        const response = await axios.get('/api/livematch/1');
        expect(response.status).toBe(200);
        done();
    });
});

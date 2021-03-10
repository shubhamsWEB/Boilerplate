import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import RandomQuickMatch from '../components/QuickMatch/rendomQuickMatch';
import 'mutationobserver-shim';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
configure({ adapter: new Adapter() });
const mockTeamAName = 'NewTeam 1';
const mockTeamBName = 'NewTeam 2';
const mockMatchName = 'T1 vs T2';
jest.mock("axios");
afterEach(cleanup);
it('Check For Teams Name', () => {
    const { container } = render(<RandomQuickMatch />);
    const teamAName = container.querySelector("input[name='teamAName']");
    const teamBName = container.querySelector("input[name='teamBName']");
    fireEvent.input(teamAName, {
        target: {
            value: mockTeamAName,
        },
    });
    fireEvent.input(teamBName, {
        target: {
            value: mockTeamBName,
        },
    });
    expect((teamAName as any).value).toEqual(mockTeamAName);
    expect((teamBName as any).value).toEqual(mockTeamBName);
});
const mockPostData = {
    teamsDetails: [
        {
            team_name: mockTeamAName,
            ownerId: 1,
            players: [
                {
                    player_name: "a"
                }
            ]
        },
        {
            ownerId: 1,
            team_name: mockTeamBName,
            players: [
                {
                    player_name: "1"
                }
            ]
        }
    ],
    matchDetails: [
        {
            match_name: mockMatchName,
            max_overs: 10,
            venue: "wankhade",
            adminId: 1
        }
    ]
};
it("Should submit form successfully with form data", async () => {
    const createMatch = jest.fn();
    const wrapper = shallow(<RandomQuickMatch onSubmit={createMatch(mockPostData)}/>);
    await act(async () => {
        wrapper.find('form').simulate('submit');
        expect(createMatch).toHaveBeenCalledWith(mockPostData);
    });
});

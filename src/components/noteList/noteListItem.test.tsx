import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NavigationContainer} from '@react-navigation/native';

import NoteListItem from './noteListItem.component';

// Mock your Redux store
const mockStore = configureStore([]);

describe('NoteListItem', () => {
  const mockNote = {
    categoryId: 1,
    clientId: 1,
    noteID: 1699763377768,
    text: 'note test 1',
  };

  it('renders correctly and handles onDetailsPress', () => {
    const store = mockStore({
      notes: {
        notes: [mockNote],
      },
      clients: [
        {
          clientID: 1,
          firstName: 'John',
          lastName: 'Doe',
          dob: '2021-01-01',
        },
      ],
    });

    // Mock NavigationContainer and navigation object
    const MockedNavigationContainer = ({children}: any) => (
      <NavigationContainer>{children}</NavigationContainer>
    );

    const {getByText} = render(
      <Provider store={store}>
        <MockedNavigationContainer>
          <NoteListItem note={mockNote} />
        </MockedNavigationContainer>
      </Provider>,
    );

    // Ensure the component renders with the provided note text
    expect(getByText('note test 1')).toBeTruthy();

    // Trigger the onDetailsPress function
    fireEvent.press(getByText('note test 1'));
    expect(store.getActions()).toEqual([
      {
        type: 'notes/setCurrentNote',
        payload: {
          categoryId: 1,
          clientId: 1,
          noteID: 1699763377768,
          text: 'note test 1',
        },
      },
    ]);
  });

  it('handles onDeleteBtnPress', () => {
    const store = mockStore({
      notes: {
        notes: [mockNote],
      },
      clients: [
        {
          clientID: 1,
          firstName: 'John',
          lastName: 'Doe',
          dob: '2021-01-01',
        },
      ],
    });

    // Mock NavigationContainer and navigation object
    const MockedNavigationContainer = ({children}: any) => (
      <NavigationContainer>{children}</NavigationContainer>
    );

    const {getByTestId} = render(
      <Provider store={store}>
        <MockedNavigationContainer>
          <NoteListItem note={mockNote} />
        </MockedNavigationContainer>
      </Provider>,
    );

    // Trigger the onDeleteBtnPress function
    fireEvent.press(getByTestId('delete-button'));
    expect(store.getActions()).toEqual([
      {
        type: 'notes/deleteNote',
        payload: 1699763377768,
      },
    ]);
  });
});

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOAD_USERS } from '../redux/reducers/people/actions';
import { PeopleTablePagination } from './PeopleTablePagination';

export const PeopleTable = () => {
  const people = useSelector((store) => store.people);
  const dispatch = useDispatch();

  const onChange = newPage => dispatch({
    type: LOAD_USERS,
    payload: {
      page: newPage,
      search: people.search
    }
  })

  const onSearch = e => dispatch({
    type: LOAD_USERS,
    payload: {
      page: 1,
      search: e.target.value
    }
  })
  return (
    <>
      <h1>Star Wars Peple</h1>

      <form style={{ display: "inline-block" }}>
        <input
          style={{ padding: '15px 20px' }}
          type="text"
          value={people.search}
          placeholder='Search people ...'
          onChange={onSearch}
        />
      </form>

      {people.loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
            <thead>
              <tr>
                <th>name</th>
                <th>birth_year</th>
                <th>eye_color</th>
                <th>gender</th>
                <th>hair_color</th>
                  <th>height</th>
                  <th/>
              </tr>
            </thead>
            <tbody>
              {people?.data?.results.map((character) => {
                const id = character.url.replaceAll(/\D/g, '')
                return (
                  <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.birtd_year}</td>
                    <td>{character.eye_color}</td>
                    <td>{character.gender}</td>
                    <td>{character.hair_color}</td>
                    <td>{character.height}</td>
                    <td>
                      <Link to={`/people/${id}`}>
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            <PeopleTablePagination
              page={people?.page}
              total={people?.data?.count}
              onChange={ onChange}
            />
        </>
      )}
    </>
  );
};

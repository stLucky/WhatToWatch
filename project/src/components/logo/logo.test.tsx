import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const LETTER_CLASSES_COUNT = 3;

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly if logo located in main page', () => {
    const {container} = render(
      <Router history={history}>
        <Logo onMain/>
      </Router>,
    );
    expect(screen.queryByRole('link')).toBeNull();
    expect(container.querySelectorAll('.logo__letter').length).toBe(LETTER_CLASSES_COUNT);
  });

  it('should render correctly if logo not located in main page', () => {
    const {container} = render(
      <Router history={history}>
        <Logo onMain={false}/>
      </Router>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(container.querySelectorAll('.logo__letter').length).toBe(LETTER_CLASSES_COUNT);
    // TODO КАКОЕ КОЛИЧЕСТВО ЭЛЕМЕНТОВ СЛЕДУЕТ ИСКАТЬ В ДОКУМЕНТЕ И ПРОВЕРЯТЬ ИХ НАЛИЧИЕ?
    // TODO НААПРИМЕР В ПРИМЕРЕ ВЫШЕ СЛЕДУЕТ ЛИ ПРОВЕРЯТЬ НАЛИЧИЕ ЭЛЕМЕНТОВ С КЛАССОМ '.LOGO_LETTER' ИЛИ ДОСТАТОЧНО ПРОВЕРИТЬ НА НАЛИЧИЕ ИЛИ ОТСУТСТВИЕ ССЫЛКИ
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo onMain={false}/>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});

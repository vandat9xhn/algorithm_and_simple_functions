const middleware1 = (store) => (next) => (action) => {
  console.log('middleware1');
  next(action);
};
const middleware2 = (store) => (next) => (action) => {
  console.log('middleware2');
  const new_action = { ...action };
  new_action['payload']['middleware2'] = 'change payload of action';
  next(new_action);
};
const middleware3 = (store) => (next) => (action) => {
  console.log('middleware3');
  next(action);
};

const middleware_arr = [middleware1, middleware2, middleware3];

window.createMiddleWare = (
  store = {
    dispatch: (action) => {
      console.log(action);
    },
  },
  action = { type: '', payload: {} }
) => {
  let is_next = true;
  let i = 0;
  let new_action = action;
  const next = (_action) => {
    is_next = true;
    new_action = _action;
  };

  while (is_next && i < middleware_arr.length) {
    is_next = false;
    middleware_arr[i](store)(next)(new_action);
    i += 1;
  }

  is_next && store.dispatch(new_action);
};

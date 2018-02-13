/**
 * Created by bolan on 2018/1/15.
 */
const todos = (state = [] , action) => {
  switch (action.type){
      case  'ADD_TODO':
          return [...state , {
                id:action.id,
              text:action.text,
              completed:false
          }];
      case 'TOGGLE_TODO':
        return state.map(todo =>{
            if(todo.id === action.id){
                return Object.assign({} ,todo , {completed:!todo.completed});
            }else{
                return todo;
            }
        });
      default:
          return state
  }
};

export default todos

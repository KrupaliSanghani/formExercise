import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filtered: any) {
    if(value.length === 0 || filtered == '' ){
      return value;
    }

const users = [];

// --search by name, enId, phNo, email--

for (const user of value){
  if(user['name'] == filtered){
    users.push(user);
  }
  else if(user['phNo'] == filtered){
    users.push(user);
  }
  else if(user['enid'] == filtered){
    users.push(user);
  }
  else if(user['email'] == filtered){
    users.push(user);
  }
}

return users

  }

}

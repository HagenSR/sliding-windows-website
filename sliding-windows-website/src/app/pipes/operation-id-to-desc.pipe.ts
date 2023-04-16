import { Pipe, PipeTransform } from '@angular/core';
import { OperationsService } from '../services/operations.service';

@Pipe({
  name: 'operationIdToDesc'
})
export class OperationIdToDescPipe implements PipeTransform {

  constructor(private operationService : OperationsService){
    this.operationService.getOperations()
  } 

  transform(value: number | string): string{
    value = Number.parseInt(value.toString());
    for(var val of this.operationService.operations){
      if (val.op_id == value){
        return val.op_desc
      }
    }
    return "null";
  }

}

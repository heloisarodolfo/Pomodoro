import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const { activeCycle, } = useContext(CyclesContext)
    const { register } = useFormContext()

    return(
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                     id="task"
                     list="task-suggestions" 
                     placeholder="Dê um nome para o seu projeto" 
                     disabled={!!activeCycle}
                     {...register('task')}
                    
                     />

                    <datalist id="task-suggestions">
                        <option value="Estudar" />
                        <option value="Projetos" />
                        <option value="Trabalho" />
                        <option value="Outro" />

                    </datalist>


                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput 
                    type="number" 
                    id="minutesAmout" 
                    placeholder="00" 
                    step={5}
                    min={5}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', { valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>
    )
    
}
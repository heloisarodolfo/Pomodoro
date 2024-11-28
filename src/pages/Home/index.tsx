import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";
import { useContext } from "react";


interface NewCycleForm {
    task: string
    minutesAmount: number
}

const newCycleFormValidationSchema = zod.object ({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>
export function Home () {
    const { activeCycle,  createNewCycle, InterruptCurrentCycle} = useContext(CyclesContext)

    const newCycleForm  = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset} = newCycleForm

    const task = watch('task')
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset();
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action=""> 
                <FormProvider {...newCycleForm}>
                    <NewCycleForm /> 
                </FormProvider>
                <Countdown/>


                { activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                            Interromper
                    </StopCountdownButton>

                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                        <Play size={24} />
                            Começar
                    </StartCountdownButton>
                )
             }

            </form>
        </HomeContainer>
    )
}
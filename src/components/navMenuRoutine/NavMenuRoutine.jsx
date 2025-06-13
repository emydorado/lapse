import './NavMenuRoutine.css';

function NavMenuRoutine({ activo, onStart, onPause, finishSeries, onNextExercise, isLastExercise, onFinishRoutine }) {
    return (
        <div id='navMenuRoutine-container'>
            {/* Botón de pausa (izquierdo) - se mantiene igual */}
            <div className='black-icon' onClick={onPause}>
                <div className='only-svg-black-icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' fill='none' viewBox='0 0 24 24'>
                        <path
                            stroke='#ffffff'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z'
                        />
                    </svg>
                </div>
                <p className='small-text'>Pausar</p>
            </div>

            {/* Botón central (empezar/terminar serie) - se mantiene igual */}
            <div className='big-black-icon' onClick={!activo ? onStart : finishSeries}>
                <div className='only-svg-big-black-icon'>
                    {!activo ? (
                        <svg
                            id='play-icon'
                            xmlns='http://www.w3.org/2000/svg'
                            width='70'
                            height='70'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke='#ffffff'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1'
                                d='M8 18V6l8 6-8 6Z'
                            />
                        </svg>
                    ) : (
                        <svg
                            id='octagon-icon'
                            xmlns='http://www.w3.org/2000/svg'
                            width='40'
                            height='40'
                            viewBox='0 0 100 100'
                            fill='none'
                            stroke='#ffffff'
                            strokeWidth='10'
                        >
                            <polygon points='30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30' />
                        </svg>
                    )}
                </div>
                <p className='small-text'>{!activo ? 'Empezar serie' : 'Terminar serie'}</p>
            </div>

            {/* Botón derecho (próximo ejercicio/finalizar rutina) - modificado */}
            <div className='black-icon' onClick={isLastExercise ? onFinishRoutine : onNextExercise}>
                <div className='only-svg-black-icon'>
                    {isLastExercise ? (
                        // Ícono de bandera para finalizar rutina
                        <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' fill='none' viewBox='0 0 24 24'>
                            <path
                                stroke='#ffffff'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z'
                            />
                        </svg>
                    ) : (
                        // Ícono de flecha para próximo ejercicio
                        <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' fill='none' viewBox='0 0 24 24'>
                            <path
                                stroke='#ffffff'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='m9 5 7 7-7 7'
                            />
                        </svg>
                    )}
                </div>
                <p className='small-text'>{isLastExercise ? 'Finalizar rutina' : 'Próximo ejercicio'}</p>
            </div>
        </div>
    );
}

export default NavMenuRoutine;

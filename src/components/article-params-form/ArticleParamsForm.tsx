// Импорт компонентов React
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

// Импорт стилей
import styles from './ArticleParamsForm.module.scss';

// Импорт компонентов приложения
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';

import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
    ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useClose } from './hooks/useCloseForm';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void; // сброс параметров формы до дефолтных
	applyStyles: () => void; // применить выбранные параметры формы
};

export const ArticleParamsForm = ({
	state,
	setState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prevOpen) => !prevOpen);
	};

    // общий обработчик
    const handleOnChange = (field: keyof ArticleStateType) => {
        return (value: OptionType) => {
          setState((prevState) => ({ ...prevState, [field]: value }));
        };
      };

	const formRef = useRef<HTMLFormElement | null>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: toggleMenu,
		rootRef: formRef,
	});

    // Сборка формы
    return (
        <>
            <ArrowButton
                onClick={() => !isMenuOpen && toggleMenu()}
                isOpen={isMenuOpen}
            />
            <aside
                className={clsx(styles.container, {
                    [styles.container_open]: isMenuOpen,
                })}>
                <form
                    className={styles.form}
                    ref={formRef}
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        applyStyles();
                    }}>
                    <Text as={'h2'} size={31} weight={800} uppercase={true}>
                        Задайте параметры
                    </Text>
                    <Select
                        title={'шрифт'}
                        onChange={handleOnChange('fontFamilyOption')}
                        selected={state.fontFamilyOption}
                        options={fontFamilyOptions}
                        placeholder='Выберите шрифт'
                    />
                    <RadioGroup
                        name='fontSize'
                        title='размер шрифта'
                        onChange={handleOnChange('fontSizeOption')}
                        selected={state.fontSizeOption}
                        options={fontSizeOptions}
                    />
                    <Select
                        title='цвет шрифта'
                        onChange={handleOnChange('fontColor')}
                        selected={state.fontColor}
                        options={fontColors}
                        placeholder='Выберите цвет'
                    />
                    <Separator />
                    <Select
                        title='цвет фона'
                        onChange={handleOnChange('backgroundColor')}
                        selected={state.backgroundColor}
                        options={backgroundColors}
                        placeholder='Выберите цвет'
                    />
                    <Select
                        title='ширина контента'
                        onChange={handleOnChange('contentWidth')}
                        selected={state.contentWidth}
                        options={contentWidthArr}
                        placeholder='Выберите ширину'
                    />
                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' type='reset' onClick={resetStyles} />
                        <Button title='Применить' type='submit' />
                    </div>
                </form>
            </aside>
        </>
    );
};

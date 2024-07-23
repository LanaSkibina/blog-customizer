// Импорт компонентов React
import { SyntheticEvent, useRef, useState } from 'react';
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
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useClose } from './hooks/useCloseForm';


type ArticleParamsFormProps = {
	articleState: TArticleState;
	setArticleState: (articleState: ArticleParamsFormProps['articleState']) => void;
};

type TArticleState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

export const ArticleParamsForm = ({
	articleState, 
    setArticleState
}: ArticleParamsFormProps) => {
    const [formState, formValue] = useState(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prevOpen) => !prevOpen);
	};

    // общий обработчик
    const handleChange = (type: keyof typeof articleState, value: OptionType) => {
		formValue((windowFormState) => ({
			...windowFormState,
			[type]: value,
		}));
	};

    const handleReset = () => {
		formValue(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(formState);
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
                    onSubmit={handleFormSubmit}>
                    <Text as={'h2'} size={31} weight={800} uppercase={true}>
                        Задайте параметры
                    </Text>
                    <Select
                        title={'шрифт'}
                        onChange={(font) => handleChange('fontFamilyOption', font)}
                        selected={formState.fontFamilyOption}
                        options={fontFamilyOptions}
                        placeholder='Выберите шрифт'
                    />
                    <RadioGroup
                        name='fontSize'
                        title='размер шрифта'
                        onChange={(fontSize) => handleChange('fontSizeOption', fontSize)}
                        selected={formState.fontSizeOption}
                        options={fontSizeOptions}
                    />
                    <Select
                        title='цвет шрифта'
                        onChange={(fontColor) => handleChange('fontColor', fontColor)}
                        selected={formState.fontColor}	
                        options={fontColors}
                        placeholder='Выберите цвет'
                    />
                    <Separator />
                    <Select
                        title='цвет фона'
                        onChange={(backgroundColor) => handleChange('backgroundColor', backgroundColor)}
                        selected={formState.backgroundColor}	
                        options={backgroundColors}
                        placeholder='Выберите цвет'
                    />
                    <Select
                        title='ширина контента'
                        onChange={(contentWidth) => handleChange('contentWidth', contentWidth)}
                        selected={formState.contentWidth}	
                        options={contentWidthArr}
                        placeholder='Выберите ширину'
                    />
                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' type='reset' onClick={handleReset} />
                        <Button title='Применить' type='submit' />
                    </div>
                </form>
            </aside>
        </>
    );
};

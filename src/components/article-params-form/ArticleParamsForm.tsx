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

    // обработчик изменения названия шрифта
	const setFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};
    
	// обработчик изменения размера шрифта
	const setFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};
    
	// обработчик изменения цвета шрифта
	const setFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};
    
	// обработчик изменения цвета фона
	const setBackgroundColor = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};
    
	// обработчик изменения ширины отображения контента
	const setContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={setContentWidth}
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

// Импорт компонентов React
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

// Импорт компонентов приложения
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

// Импорт стилей
import './styles/index.scss';
import styles from './styles/index.module.scss';

// Получаем корневой dom-узел и создаем корень React приложения
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	
	// Отрисовка компонентов приложения
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};

// Сборка приложения
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

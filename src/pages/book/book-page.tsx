import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useActions } from "../../common/hooks/use-actions";
import { useAppSelector } from "../../common/hooks/use-app-selector";
import { Size, useWindowSize } from "../../common/hooks/use-window-size";
import { syncAppActions } from "../../store/app/app-slice";
import { asyncBookActions } from "../../store/book-page/book/book-slice";
import { asyncBooksActions } from "../../store/main-page/books/books-slice";
import { Breadcrumbs, Crumb } from "../../ui/breadcrumbs";

import style from "./book-page.module.css";

export const BookPage = () => {
    const location = useLocation();
    const params = useParams();
    const size: Size = useWindowSize();

    const book = useAppSelector((state) => state.book.book);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const error = useAppSelector((state) => state.app.appError);
    const categories = useAppSelector((state) => state.books.categories);
    const { fetchBook } = useActions(asyncBookActions);
    const { fetchCategories } = useActions(asyncBooksActions);
    const { toggleLoading } = useActions(syncAppActions);

    const currentCategory = useMemo(
        () => categories.find((el) => el.path === params.category),
        [categories, params.category]
    );

    const shouldFetch = useRef(true);

    const fetchCategoriesAndBook = useCallback(async () => {
        toggleLoading({ isLoading: true });
        if (categories.length === 0) {
            if (params.bookId) {
                await Promise.all([fetchCategories({}), fetchBook({ id: +params.bookId })]);
            }
        } else if (params.bookId) {
            await fetchBook({ id: +params.bookId });
        }
        toggleLoading({ isLoading: false });
    }, [categories.length, fetchBook, fetchCategories, params.bookId, toggleLoading]);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            fetchCategoriesAndBook();
        }
    }, [fetchCategoriesAndBook]);

    return (
        <section className={style.container}>
            <Breadcrumbs>
                <Crumb dataTestIdLink="breadcrumbs-link"
                       path={`/books/${currentCategory ? currentCategory.path : "all"}`}>
                    {currentCategory ? currentCatego"y.name : 'Все кн"ги'}
                        </Crumb>
                        <Crumb dataTestIdName='book-name' path={location.pa"all"e}>
                    {book.title}
                        </Crumb>
                        </Breadcrumbs>
                        "Все книги"ing ? (
                        <Loader />
                        ) : (
                        !error && (
                        "   <div>
                        "           <div className={style.frame}>
                        <div className={style.sliderContainer}>
                        <Slider images={book.images} />
                        </div>
                        <ShortDescription
                        title={book.title}
                        authors={book.authors}
                        dateHandedTo={book.delivery ? book.delivery.dateHandedTo : null}
                        order={book.booking ? book.booking.order : false}
                        handed={book.delivery ? book.delivery.handed : false}
                        description={book.description}
                        />
                        </div>
                        <div>
                        <div className={style.contentBlock}>
                    {size.width <= 992 && (
                        <div className={style.descriptionBlock}>
                        <h5 className={style.descriptionTitle}>О книге</h5>
                        <BodyTypography type='large'>{book.description ? book.description : "---"}</BodyTypography>
                        </div>
                        )}
                        <div className={style.informationContainer}>
                        <div className={style.ratingAndInformationBlock}>
                        <RatingBlock rating={book.rating} />
                        <InformationBlock
                        cover={book.cover}
                        weight={book.weight}
                        categories={book.categories}
                        ISBN={book.ISBN}
                        issueYear={book.issueYear}
                        format={book.format}
                        pages={book.pages}
                        producer={book.producer}
                        publish={book.publish}
                        />
                        </div>
                        <Feedback comments={book.comments} />
                        </div>
                        </div>
                        <Button
                        dataTestId='button-rating'
                        className={style.ratingButton}
                        size='large'
                        sizeTypography='large'
                        variant='primary'
                        variantTypography='desktop'
                        submit={false}
                        >
                        Оценить книгу
                        </Button>
                        </div>
                        </div>
                        )
                        )}
        </section>
);
};

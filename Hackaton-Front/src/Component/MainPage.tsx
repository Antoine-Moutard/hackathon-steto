type MainPageProps = {
    userId: number | null;
}

export const MainPage = ({ userId }: MainPageProps) => {
    return (
        <div>
            <h1>Main Page</h1>
            {userId !== null ? (
                <p>ID de l'utilisateur sélectionné : {userId}</p>
            ) : (
                <p>Aucun utilisateur sélectionné</p>
            )}
        </div>
    );
}

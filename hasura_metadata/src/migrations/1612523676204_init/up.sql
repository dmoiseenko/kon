CREATE TABLE zoru.todo
(
    id uuid NOT NULL,
    text text,
    PRIMARY KEY (id)
);

ALTER TABLE zoru.todo
    OWNER to zoru;

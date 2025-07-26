CREATE TABLE `user`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `nickname`     VARCHAR(50)  NOT NULL,
    `phone_number` VARCHAR(50)  NOT NULL,
    `point`        INT          NOT NULL DEFAULT 0,
    `kakao_uid`    VARCHAR(255) NOT NULL,
    `is_guardian`  BOOLEAN      NOT NULL DEFAULT FALSE,
    `fcm_token`    VARCHAR(255) NOT NULL,
    `created_at`   TIMESTAMP    NOT NULL,
    `updated_at`   TIMESTAMP    NOT NULL,
    PRIMARY KEY (`id`)
);

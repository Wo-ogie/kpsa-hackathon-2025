DROP TABLE IF EXISTS `prescription_drug`;
DROP TABLE IF EXISTS `prescription`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `nickname`     VARCHAR(50)  NOT NULL,
    `phone_number` VARCHAR(50)  NOT NULL UNIQUE,
    `point`        INT          NOT NULL DEFAULT 0,
    `kakao_uid`    VARCHAR(255) NOT NULL,
    `is_guardian`  BOOLEAN      NOT NULL DEFAULT FALSE,
    `fcm_token`    VARCHAR(255) NOT NULL,
    `created_at`   TIMESTAMP    NOT NULL,
    `updated_at`   TIMESTAMP    NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `prescription`
(
    `id`                    BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`               BIGINT      NOT NULL,
    `name`                  VARCHAR(50) NOT NULL,
    `medication_start_date` DATE        NOT NULL,
    `created_at`            TIMESTAMP   NOT NULL,
    `updated_at`            TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `prescription_drug`
(
    `id`              BIGINT      NOT NULL AUTO_INCREMENT,
    `prescription_id` BIGINT      NOT NULL,
    `name`            VARCHAR(50) NOT NULL,
    `dose_per_time`   DOUBLE      NOT NULL,
    `medication_time` VARCHAR(50) NOT NULL,
    `count`           SMALLINT    NOT NULL,
    `created_at`      TIMESTAMP   NOT NULL,
    `updated_at`      TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
)
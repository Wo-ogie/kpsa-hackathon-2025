DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `family`;
DROP TABLE IF EXISTS `medication_history`;
DROP TABLE IF EXISTS `purchased_plant`;
DROP TABLE IF EXISTS `user_plant`;
DROP TABLE IF EXISTS `plant`;
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
);

CREATE TABLE `plant`
(
    `id`               BIGINT      NOT NULL AUTO_INCREMENT,
    `name`             VARCHAR(50) NOT NULL,
    `max_fruit_count`  INT         NOT NULL,
    `point_per_fruit`  INT         NOT NULL,
    `unlock_price`     INT         NOT NULL,
    `plant_price`      INT         NOT NULL,
    `growth_increment` SMALLINT    NOT NULL,
    `created_at`       TIMESTAMP   NOT NULL,
    `updated_at`       TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `purchased_plant`
(
    `id`         BIGINT    NOT NULL AUTO_INCREMENT,
    `user_id`    BIGINT    NOT NULL,
    `plant_id`   BIGINT    NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
);

CREATE TABLE `user_plant`
(
    `id`           BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`      BIGINT      NOT NULL,
    `plant_id`     BIGINT      NOT NULL,
    `nickname`     VARCHAR(50) NOT NULL,
    `growth`       SMALLINT    NOT NULL,
    `fruit_count`  SMALLINT    NOT NULL DEFAULT 0,
    `is_completed` BOOLEAN     NOT NULL DEFAULT FALSE,
    `created_at`   TIMESTAMP   NOT NULL,
    `updated_at`   TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
);

CREATE TABLE `medication_history`
(
    `id`              BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`         BIGINT      NOT NULL,
    `prescription_id` BIGINT      NOT NULL,
    `medication_time` VARCHAR(50) NOT NULL,
    `created_at`      TIMESTAMP   NOT NULL,
    `updated_at`      TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);

CREATE TABLE `family`
(
    `id`                              BIGINT      NOT NULL AUTO_INCREMENT,
    `requester_id`                    BIGINT      NOT NULL,
    `requester_nickname`              VARCHAR(50) NOT NULL,
    `recipient_id`                    BIGINT      NOT NULL,
    `recipient_nickname`              VARCHAR(50) NOT NULL,
    `requester_allow_view_medication` BOOLEAN     NOT NULL,
    `requester_allow_alarm`           BOOLEAN     NOT NULL,
    `recipient_allow_view_medication` BOOLEAN     NOT NULL,
    `recipient_allow_alarm`           BOOLEAN     NOT NULL,
    `created_at`                      TIMESTAMP   NOT NULL,
    `updated_at`                      TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_family_pair` (`requester_id`, `recipient_id`),
    FOREIGN KEY (`requester_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`recipient_id`) REFERENCES `user` (`id`)
);


CREATE TABLE `notifications`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`    BIGINT      NOT NULL,
    `title`      VARCHAR(50) NOT NULL,
    `content`    VARCHAR(50) NOT NULL,
    `is_read`    BOOLEAN     NOT NULL DEFAULT FALSE,
    `created_at` TIMESTAMP   NOT NULL,
    `updated_at` TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
-- CreateIndex
CREATE FULLTEXT INDEX `Task_description_idx` ON `Task`(`description`);

-- CreateIndex
CREATE FULLTEXT INDEX `Task_description_title_idx` ON `Task`(`description`, `title`);

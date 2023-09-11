import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactQuery } from './dtos/contact.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async createContactAndLead(@Query() contactQuery: ContactQuery) {
    // Пробуем найти контакт по номеру телефона
    let contact = await this.appService.findContact(contactQuery.phone);

    if (!contact) {
      // Если по номеру телефона не находит, пробуем найти по email
      contact = await this.appService.findContact(contactQuery.email);

      if (!contact) {
        // Если не нашло ни по номеру телефона ни по email, создаем новый контакт
        contact = await this.appService.createContact(contactQuery);
      }
    }

    // Обновляем данные контакта
    contact = await this.appService.updateContact(contact.id, contactQuery);

    // Создаем сделку для контакта
    let lead = await this.appService.createLead(contact.id);

    return lead;
  }
}

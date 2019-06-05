import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import jwtDecode from 'jwt-decode';
import model from '../models';
import { StatusResponse } from '../helpers';

dotenv.config();
const { services } = model;

/**
 * @description - This class is all about users offered services
 * @param {object} req
 * @param {object} res
 * @returns {class} Services
 */
class Services {
  /**
   * @description - This method takes care of creating a user's service
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} users created service
   */
  static async create(req, res) {
    const token = req.headers.authorization;
    const {
      category, subcategory, title, description, price, days, media
    } = req.body;

    const { username } = req.params;

    if (username !== jwtDecode(token).username) {
      StatusResponse.unauthorized(res, {
        status: 401,
        data: {
          error: 'Unauthorized, you cannot create a service on behalf of another user'
        }
      });
    } else {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const createdUsersService = await services.create({
          category,
          subcategory,
          title,
          description,
          price,
          days,
          media,
          userId: decoded.userId
        });
        StatusResponse.created(res, {
          status: 201,
          data: {
            message: 'Service created successfully',
            service: createdUsersService
          }
        });
      } catch (error) {
        StatusResponse.unauthorized(res, {
          status: 401,
          data: {
            error: 'Unauthorized, user not authenticated'
          }
        });
      }
    }
  }

  /**
   * @description - This method takes care of updating a user's service
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} users updated service
   */
  static async update(req, res) {
    const token = req.headers.authorization;
    const {
      category, subcategory, title, description, price, days, media
    } = req.body;

    const { username, serviceId } = req.params;

    if (username !== jwtDecode(token).username) {
      StatusResponse.unauthorized(res, {
        status: 401,
        data: {
          error: 'Unauthorized, you cannot update a service on behalf of another user'
        }
      });
    } else {
      const returnedService = await services.findOne({
        where: {
          id: serviceId,
          userId: jwtDecode(token).userId
        }
      });

      try {
        jwt.verify(token, process.env.SECRET_KEY);
        if (returnedService) {
          const updatedUsersService = await returnedService.update({
            category: category || returnedService.dataValues.category,
            subcategory: subcategory || returnedService.dataValues.subcategory,
            title: title || returnedService.dataValues.title,
            description: description || returnedService.dataValues.description,
            price: price || returnedService.dataValues.price,
            days: days || returnedService.dataValues.days,
            media: media || returnedService.dataValues.media
          });
          StatusResponse.success(res, {
            status: 200,
            data: {
              message: 'Service updated successfully',
              service: updatedUsersService
            }
          });
        } else {
          StatusResponse.notfound(res, {
            status: 404,
            data: {
              message: 'Service not found',
              service: {}
            }
          });
        }
      } catch (error) {
        StatusResponse.unauthorized(res, {
          status: 401,
          data: {
            error: 'Unauthorized, user not authenticated'
          }
        });
      }
    }
  }
}

export default Services;

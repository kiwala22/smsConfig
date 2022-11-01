# frozen_string_literal: true

module Api
  module V2
    # controller to check current user session
    class CurrentUserController < ApplicationController
      skip_before_action :verify_authenticity_token

      def check_current_user
        if user_signed_in?
          render json: { user: current_user, message: 'Authorized' }, status: 200
        else
          render json: { message: 'Unauthorized' }
        end
      end
    end
  end
end

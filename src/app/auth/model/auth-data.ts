import { NewDeviceMetadataType } from "@aws-sdk/client-cognito-identity-provider";

export interface AuthData {
    AccessToken?: string;
    ExpiresIn?: number;
    TokenType?: string;
    RefreshToken?: string;
    IdToken?: string;
    NewDeviceMetadata?: NewDeviceMetadataType;
}

export interface AuthResponse { 
    AuthenticationResult?: AuthData;
}
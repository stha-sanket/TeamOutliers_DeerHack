import numpy as np


class Board:
    def __init__(self):
        ...

    @staticmethod
    def calculateLensPhysics(data: dict):
        lens_type = data.get('lens_type')
        object_distance = float(data.get('object_distance'))
        focal_length = float(data.get('focal_length'))

        if lens_type == 'convex':
            f = focal_length
        else:
            f = -focal_length

        u = -object_distance

        if (u + f) == 0:
            image_distance = float('inf')
        else:
            image_distance = (f * u) / (u + f)

        return {
            'image_distance': image_distance,
        }

    @staticmethod
    def calculateSwimmingPhysics(data):
        v0 = float(data['v0'])
        angle = float(data['angle'])

        g = 9.8
        angle_rad = np.deg2rad(angle)

        t_flight = (2 * v0 * np.sin(angle_rad)) / g

        t = np.linspace(0, t_flight, num=500)
        x = v0 * np.cos(angle_rad) * t
        y = v0 * np.sin(angle_rad) * t - 0.5 * g * t ** 2

        range_val = (v0 ** 2 * np.sin(2 * angle_rad)) / g
        max_height = (v0 ** 2 * (np.sin(angle_rad)) ** 2) / (2 * g)

        return {
            'x': x.tolist(),
            'y': y.tolist(),
            'range': range_val,
            'max_height': max_height,
            't_flight': t_flight
        }

    def calculateVectorPhysics(self, data):
        ...

    def calculateProjectilePhysics(self, data):
        ...
